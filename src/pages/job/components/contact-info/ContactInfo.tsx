import { APIProvider } from "@vis.gl/react-google-maps";
import Title from "../../../../components/Title";
import { JobType } from "../../../../utils/type";
import ContactInfoDetail from "./components/ContactInfoDetail";
import MapInfo from "../../../company/components/MapInfo";

interface ContactInfoProps {
  jobData: JobType;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ jobData }) => {
  const latitute = jobData.latitude !== undefined ? jobData.latitude : "";
  const longitude = jobData.longitude !== undefined ? jobData.longitude : "";

  return (
    <div>
      <Title type="h4">Contact information</Title>

      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        <ContactInfoDetail jobData={jobData} />

        <div>
          <p className="text-sm text-[var(--text-color-normal)]">
            Location on map
          </p>
          <APIProvider apiKey="AIzaSyC52sX6DS9XwK8fRjgiyJIFB8KXEMHmPIA">
            <MapInfo latitute={latitute} longitude={longitude} />
          </APIProvider>
        </div>
        {/* <div className="bg-red-800"></div> */}
      </div>
    </div>
  );
};

export default ContactInfo;
