import { CertificateType } from "../../../../utils/type";

type Props = {
  certificates: CertificateType[];
};

export default function CertificatesSection({ certificates }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <p className="text-bold text-center md:text-start font-bold col-span-2 ">
        Certificates
      </p>

      <div className="text-bold col-span-10 text-base">
        {certificates.map((certificate, index) => (
          <div
            className="flex flex-col gap-2 flex-nowrap"
            key={"certificate-" + index}
          >
            <div className="flex flex-col  flex-nowrap">
              <div className="text-base  text-bold font-bold">
                {certificate.title}
              </div>
              <div className="flex flex-row gap-2  flex-nowrap">
                <div className="text-base  text-bold">
                  <span>{certificate.issueDate}</span>
                </div>

                <span>|</span>
                <p className="text-bold text-base ">{certificate.provider}</p>
              </div>
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
