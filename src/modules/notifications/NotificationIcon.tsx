import { Badge, Button, notification, Popover, Typography } from "antd";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { RiDeleteBinLine, RiNotificationLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Cookies from "js-cookie";
import { COOKIE_EMPLOYER_ID, COOKIE_USER_ID } from "../employer";
import {
  useDeleteNotification,
  useDeleteNotificationEmployer,
  useGetNotifications,
  useGetNotificationsEmployer,
  useReadNotification,
  useReadNotificationEmployer,
} from "./actions";
import Divider from "../../components/Divider";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export const NotifcationIcon = () => {
  const user = useSelector((state: RootState) => state.user);
  const userId = parseInt(Cookies.get(COOKIE_USER_ID) ?? "");
  const employer = useSelector((state: RootState) => state.employer);
  const employerId = parseInt(Cookies.get(COOKIE_EMPLOYER_ID) ?? "");

  const { data: NotificationsOfUser } = useGetNotifications(userId);
  const { data: NotificationsOfEmployer } =
    useGetNotificationsEmployer(employerId);

  const pusherRef = useRef(
    new Pusher("3cd1ba9bc8746d6a85f0", { cluster: "ap1" }),
  );

  const [notifications, setNotifications] = useState<
    {
      id: number;
      message: string;
      read_at: string;
      read: string;
      created_at: string;
    }[]
  >([]);

  useEffect(() => {
    if (NotificationsOfUser) {
      setNotifications(NotificationsOfUser);
    }
    if (NotificationsOfEmployer) {
      setNotifications(NotificationsOfEmployer);
    }
  }, [NotificationsOfEmployer, NotificationsOfUser]);

  useEffect(() => {
    const id = userId || employerId;
    const notification = pusherRef.current.subscribe(`user.${id}`);

    if (Cookies.get(COOKIE_EMPLOYER_ID)) {
      notification.bind("JobApplicationReceived", (newNoti: any) => {
        setNotifications((prev) =>
          prev.length ? [...prev, newNoti] : [newNoti],
        );
      });
    }
    if (Cookies.get(COOKIE_USER_ID)) {
      notification.bind("ApplicationStatusUpdated", (newNoti: any) => {
        setNotifications((prev) =>
          prev.length ? [...prev, newNoti] : [newNoti],
        );
      });
    }

    return () => {
      notification.unbind_all();
      notification.unsubscribe();
    };
  }, [user, employer, userId, employerId]);

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      arrow={false}
      className="relative"
      content={<NotificationList items={notifications} />}
    >
      <Badge
        className="absolute -right-1 -top-1"
        size="small"
        count={
          notifications.filter((item) => (userId ? !item.read : !item.read_at))
            ?.length
        }
      />
      <Button
        type="text"
        variant="text"
        className="text-white hover:!text-white"
        icon={<RiNotificationLine size={20} />}
      />
    </Popover>
  );
};

const NotificationList = ({
  items,
}: {
  items: {
    id: number;
    message: string;
    read_at: string;
    read: string;
    created_at: string;
  }[];
}) => {
  return (
    <>
      <Typography.Title level={5}>Thông báo</Typography.Title>
      <ul className="h-80 w-80 overflow-auto p-4">
        {items.length ? (
          items.map((item, i, self) => (
            <NotificationItem
              key={item.id}
              lastItem={i + 1 === self.length}
              {...item}
            />
          ))
        ) : (
          <li>Không có thông báo nào</li>
        )}
      </ul>
    </>
  );
};

const NotificationItem = ({
  id,
  message,
  read_at,
  created_at,
  lastItem,
  read,
}: {
  id: number;
  message: string;
  read_at: string;
  created_at: string;
  read: string;
  lastItem: boolean;
}) => {
  const { mutate: userRead, isPending: userPending } = useReadNotification();
  const { mutate: employerRead, isPending: employerPending } =
    useReadNotificationEmployer();

  const { mutate: userDelete, isPending: userDeletePending } =
    useDeleteNotification();
  const { mutate: employerDelete, isPending: employerDeletePending } =
    useDeleteNotificationEmployer();

  const userId = parseInt(Cookies.get(COOKIE_USER_ID) ?? "");
  const employerId = parseInt(Cookies.get(COOKIE_EMPLOYER_ID) ?? "");

  const onRead = () => {
    if (userId) {
      userRead(id, {
        onSuccess: () => {
          notification.success({
            message: "Đánh dấu đã đọc thành công",
          });
        },
      });
    }
    if (employerId) {
      employerRead(id, {
        onSuccess: () => {
          notification.success({
            message: "Đánh dấu đã đọc thành công",
          });
        },
      });
    }
  };

  const onDelete = () => {
    if (userId) {
      userDelete(id, {
        onSuccess: () => {
          notification.success({
            message: "Xóa thông báo thành công",
          });
        },
      });
    }
    if (employerId) {
      employerDelete(id, {
        onSuccess: () => {
          notification.success({
            message: "Xóa thông báo thành công",
          });
        },
      });
    }
  };

  const isNotRead = userId ? !read : !read_at;

  return (
    <li className="mb-3 flex flex-col">
      <div className="flex gap-2">
        <Typography.Paragraph className={`${isNotRead && "font-bold"}`}>
          {message}
        </Typography.Paragraph>

        <div className="flex gap-1">
          <Button
            loading={userPending || employerPending}
            onClick={onRead}
            disabled={!isNotRead}
            variant="solid"
            color="primary"
            size="small"
            icon={<MdOutlineMarkEmailRead size={10} />}
          />
          <Button
            loading={userDeletePending || employerDeletePending}
            onClick={onDelete}
            variant="solid"
            color="danger"
            size="small"
            icon={<RiDeleteBinLine size={10} />}
          />
        </div>
      </div>
      <Typography.Text className="text-xs">{created_at}</Typography.Text>
      {!lastItem && <Divider />}
    </li>
  );
};
