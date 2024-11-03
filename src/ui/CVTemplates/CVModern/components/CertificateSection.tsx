import Divider from "../../../../components/Divider";
import Title from "../../../../components/Title";
import { CertificateType } from "../../../../utils/type";

type Props = {
  certificates: CertificateType[];
  templateColor: string;
};

export default function CertificateSection({
  certificates,
  templateColor,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <Title type="h6" className={`font-medium text-[${templateColor}]`}>
        CERTIFICATE
      </Title>

      <div className="text-bold flex flex-col gap-2 text-sm">
        {certificates.map((certificate, index) => (
          <div className="flex flex-col gap-1 flex-nowrap" key={index}>
            <div className="flex flex-col  flex-nowrap">
              <div className="text-sm  text-bold">
                <span>{certificate.issueDate}</span>
              </div>
              <Divider className="!my-1" />
              <div className="text-sm  text-bold font-bold">
                {certificate.title}
              </div>
              <p className="text-bold text-sm font-medium">
                {certificate.provider}
              </p>
            </div>
            <div>
              Certificate URL:
              <a
                href={certificate.certificateUrl}
                target="_blank"
                className="underline"
              >
                {certificate.certificateUrl}
              </a>
            </div>
            <div
              className=" text-sm text-bold "
              dangerouslySetInnerHTML={{
                __html: certificate.description,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
