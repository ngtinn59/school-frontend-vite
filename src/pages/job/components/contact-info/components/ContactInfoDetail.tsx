import { JobType } from "../../../../../utils/type";

interface ContactInfoDetailProps {
  jobData: JobType;
}

const ContactInfoDetail: React.FC<ContactInfoDetailProps> = ({ jobData }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
      <div>
        <p className="text-sm text-[var(--text-color-normal)]">
          Contact person
        </p>
        <p>{jobData.contact_name}</p>
      </div>

      <div>
        <p className="text-sm text-[var(--text-color-normal)]">Email</p>
        <p>{jobData.email}</p>
      </div>

      <div>
        <p className="text-sm text-[var(--text-color-normal)]">Phone number</p>
        <p>{jobData.phone}</p>
      </div>

      <div>
        <p className="text-sm text-[var(--text-color-normal)]">Address</p>
        <p>{jobData.work_address}</p>
      </div>
    </div>
  );
};

export default ContactInfoDetail;
