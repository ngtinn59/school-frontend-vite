import React from "react";
import Wrapper from "../../components/Wrapper";
import Divider from "../../components/Divider";

const ContactPage: React.FC = () => {
  const students = [
    { name: "Nguyễn Thành Tín", id: "B2004814" },
    { name: "Trần Thanh Thiên", id: "B2004810" },
    { name: "Lê Phước Thành", id: "B2004808" },
  ];

  return (
    <div className="container mx-auto mt-4">
      <Wrapper>
        <h1 className="text-2xl text-center font-bold mb-2">
          Project: Website generate CV
        </h1>
        <p className="text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <Divider />
        <h1 className="text-2xl text-center font-bold mb-2">Team member:</h1>
        <div className="grid grid-cols-1 gap-4 pb-12">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-gray-200 p-4 hover:bg-primary group"
            >
              <h2 className="text-lg font-bold group-hover:text-white">
                {student.name}
              </h2>
              <p className="text-gray-600 group-hover:text-white">
                Student ID: {student.id}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default ContactPage;
