import { Avatar, Empty } from "antd";
import { useAppSelector } from "../../app/hooks";

export const EmployerProfile = () => {
  const profile = useAppSelector((state) => state.employer.profile);

  const renderProfile = () => {
    if (!profile) return <Empty />;

    const displayData: Record<string, any> = {
      country: { label: "country", value: profile.country ?? "-" },
      city: { label: "city", value: profile.city ?? "-" },
      address: { label: "address", value: profile.address ?? "-" },
      webstie: {
        label: "webstie",
        value: (
          <a href={profile?.webstie ?? ""} target="_blank">
            {profile?.webstie ?? "-"}
          </a>
        ),
      },
      companyType: { label: "company type", value: profile.companyType ?? "-" },
      companySize: { label: "company size", value: profile.companySize ?? "-" },
      Working_days: {
        label: "working days",
        value: profile.Working_days ?? "-",
      },
      Overtime_policy: {
        label: "overtime policy",
        value: profile.Overtime_policy ?? "-",
      },
      facebook: {
        label: "facebook",
        value: (
          <a href={profile?.facebook ?? ""} target="_blank">
            {profile?.facebook ?? "-"}
          </a>
        ),
      },
    };

    return Object.values(displayData).map((info) => {
      return (
        <div
          key={info.label}
          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt className="text-sm font-medium leading-6 text-gray-900">
            {info.label}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {info.value}
          </dd>
        </div>
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div>
        <Avatar
          size={100}
          src={
            <img
              src={
                profile?.logo ??
                `https://avatar.iran.liara.run/username?username=${profile?.name?.slice(
                  0
                )}+${profile?.name?.slice(1)}`
              }
              alt="avatar"
            />
          }
        />
      </div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Employer Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          details and information.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">{renderProfile()}</dl>
      </div>
    </div>
  );
};
