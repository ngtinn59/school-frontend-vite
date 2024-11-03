import { faFileLines, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../components/Card";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";
import {
  message,
  Upload,
  UploadFile,
  UploadProps,
  Button,
  List,
  Typography,
} from "antd";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL_API } from "../utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/baseAxios";

export default function ManageCV() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const handleUpload = () => {
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append("cv", file as any);
    });
    setUploading(true);

    axios
      .post(`${BASE_URL_API}/api/cvs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((data) => data)
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
        queryClient.invalidateQueries({
          queryKey: ["list-cv"],
        });
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    disabled: uploading,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);

      return false;
    },
    fileList,
    listType: "picture",
    maxCount: 1,
    multiple: false,
  };

  const { data: listCv } = useQuery({
    queryKey: ["list-cv"],
    queryFn: () => axiosInstance.get(`api/cvs`),
    select(data) {
      return data.data.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (id) => axiosInstance.put(`api/cvs/${id}/set-default`),
    onSuccess: () => {
      message.success("Set Cv Default successfully.");
      queryClient.invalidateQueries({
        queryKey: ["list-cv"],
      });
    },
    onError: () => {
      message.error("Set Cv Default failed.");
    },
  });

  return (
    <Wrapper className="flex flex-col gap-6">
      <Card className="bg-white gap-5 flex flex-col">
        <Title type="h3">Manage CVs</Title>
        <p className="font-medium text-normal">
          Upload your CV below to use it throughout your application process
        </p>
        <Upload.Dragger {...props}>
          <div className="flex text-center flex-row justify-center items-center gap-4  p-5 border border-solid border-gray-300 rounded-md">
            <div>
              <FontAwesomeIcon
                icon={faFileLines}
                className="h-[40px] text-normal"
              />
            </div>

            <div className="flex flex-col flex-1">
              <Title type="h5" className="font-medium">
                Your own CV
              </Title>
              <div className="text-base justify-center w-full flex flex-row cursor-pointer">
                <span className="pr-2 font-semibold text-primary">
                  <FontAwesomeIcon icon={faUpload} className="pr-2" />
                  Upload
                </span>

                <span className="font-medium   text-gray-400">
                  No file chosen (Use .doc, .docx or .pdf files, 3MB and no
                  password protected)
                </span>
              </div>{" "}
            </div>
          </div>
        </Upload.Dragger>
        <Button
          disabled={fileList.length === 0}
          type="primary"
          onClick={handleUpload}
          loading={uploading}
        >
          Upload
        </Button>
      </Card>

      <List
        header={<div>List CV Uploaded</div>}
        bordered
        dataSource={listCv ?? []}
        renderItem={(item: any) => (
          <List.Item className="flex">
            <Typography.Text>
              {item?.file_path?.split("/").pop()}

              {item?.is_default === 1 ? (
                <Typography.Text className="ml-5" italic mark>
                  Default
                </Typography.Text>
              ) : null}
            </Typography.Text>

            {item?.is_default === 0 ? (
              <Button onClick={() => mutate(item.id)}>Set As Default</Button>
            ) : null}
          </List.Item>
        )}
      />
    </Wrapper>
  );
}
