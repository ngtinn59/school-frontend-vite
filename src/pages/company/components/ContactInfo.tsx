import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { HiReceiptTax } from "react-icons/hi";

import toast from "react-hot-toast";
import { MdOutlineLink } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Title from "../../../components/Title";
import { CompanyDetailType } from "../../../utils/type";

interface ContactInfoProps {
  data: CompanyDetailType;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ data }) => {
  return (
    <>
      <Title type="h4" className="text-[var(--text-color-bold)]">
        Our website
      </Title>
      <div className="flex items-center gap-2 text-[var(--text-color-normal)]">
        <MdOutlineLink />
        <NavLink to={data.website} className="underline">
          {data.website}
        </NavLink>
      </div>

      <Title type="h4" className="mt-4 text-[var(--text-color-bold)]">
        Contact information
      </Title>

      <div className="flex items-center gap-2 text-[var(--text-color-normal)]">
        <IoMail />
        <p
          className="cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(data.company_email);
            toast.success("Đã sao chép email công ty vào clipboard");
          }}
        >
          {data.company_email}
        </p>
      </div>

      <div className="flex items-center gap-2 text-[var(--text-color-normal)]">
        <FaPhoneAlt />
        <p
          className="cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(data.phone);
            toast.success("Đã sao chép số điện thoại vào clipboard");
          }}
        >
          {data.phone}
        </p>
      </div>

      <div className="flex items-center gap-2 text-[var(--text-color-normal)]">
        <HiReceiptTax />
        <p>{data.tax_code}</p>
      </div>

      <div className="flex items-start justify-between gap-2 text-[var(--text-color-normal)]">
        <FaMapMarkerAlt className="mt-1" />
        <p
          className="w-[100%] cursor-pointer text-balance"
          onClick={() => {
            navigator.clipboard.writeText(data.address);
            toast.success("Đã sao chép địa chỉ vào clipboard");
          }}
        >
          {data.address}
        </p>
      </div>
    </>
  );
};

export default ContactInfo;
