import { Avatar, Empty } from "antd";
import { useAppSelector } from "../../app/hooks";
import dayjs from "dayjs";

export const EmployerProfile = () => {
  const profile = useAppSelector((state) => state.employer.profile);

  const renderProfile = () => {
    if (!profile) return <Empty />;

    const displayData: Record<string, any> = {
      company_name: { label: "Company name", value: profile?.name ?? "-" },
      company_email: { label: "Company email", value: profile?.company_email ?? "-" },
      phone: { label: "Phone number", value: profile?.phone ?? "-" },
      description: { label: "Description", value: profile?.description ?? "-" },
      country: { label: "Country", value: profile?.country?.name ?? "-" },
      city: { label: "City", value: profile?.city?.name ?? "-" },
      district: { label: "District", value: profile?.district?.name ?? "-" },
      address: { label: "Address", value: profile?.address ?? "-" },
      website: {
        label: "Website",
        value: (
          <a href={profile?.website ?? ""} target="_blank">
            {profile?.website ?? "-"}
          </a>
        ),
      },
      facebook: {
        label: "Facebook",
        value: (
          <a href={profile?.facebook ?? ""} target="_blank">
            {profile?.facebook ?? "-"}
          </a>
        ),
      },
      youtube: {
        label: "Youtube",
        value: (
          <a href={profile?.youtube ?? ""} target="_blank">
            {profile?.youtube ?? "-"}
          </a>
        ),
      },

      linked: {
        label: "Linkedin",
        value: (
          <a href={profile?.linked ?? ""} target="_blank">
            {profile?.linked ?? "-"}
          </a>
        ),
      },
      tax_code: { label: "Tax code", value: profile?.tax_code ?? "-" },
      date_of_establishment: {
        label: "Date of establishment",
        value: profile?.date_of_establishment
          ? dayjs(profile.date_of_establishment).format("DD/MM/YYYY")
          : "-",
      },
      companyType: { label: "Company type", value: profile?.companyType?.name ?? "-" },
      companySize: { label: "Company size", value: profile?.companySize?.name ?? "-" },
      working_days: {
        label: "Working days",
        value: profile.working_days ?? "-",
      },
      overtime_policy: {
        label: "Overtime policy",
        value: profile.overtime_policy ?? "-",
      },
      latitude: { label: "Latitude", value: profile.latitude ?? "-" },
      longitude: { label: "Longitude", value: profile.longitude ?? "-" },
    };

    return Object.values(displayData).map((info) => {
      return (
        <div key={info.label} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">{info.label}</dt>
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
        {profile && (
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
        )}
      </div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Employer Profile</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Details and information.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">{renderProfile()}</dl>
      </div>
    </div>
  );
};
