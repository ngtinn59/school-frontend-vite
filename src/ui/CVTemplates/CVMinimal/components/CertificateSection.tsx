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
        CERTIFICATES
      </Title>

      <div className="text-bold flex flex-col gap-1 text-base">
        {certificates.map((certificate, index) => (
          <div
            className="flex flex-col gap-1 flex-nowrap"
            key={"certificate-" + index}
          >
            <div className="flex flex-col  flex-nowrap">
              <div className="flex flex-row gap-1 justify-between  flex-nowrap">
                <div className="text-base  text-bold font-bold">
                  {certificate.title}
                </div>
                <div className="text-base  text-bold">
                  <span>{certificate.issueDate}</span>
                </div>
              </div>
              <p className="text-bold text-base font-medium">
                {certificate.provider}
              </p>
            </div>
            <div>
              Certificate URL:{" "}
              <a
                href={certificate.certificateUrl}
                target="_blank"
                className="underline"
              >
                {certificate.certificateUrl}
              </a>
            </div>
            <div
              className=" text-base text-bold "
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
