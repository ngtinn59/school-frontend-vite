type Props = {
  aboutMeDescription: string;
  profileImage: string;
};

export default function AboutMeSection({
  aboutMeDescription,
  profileImage,
}: Props) {
  return (
    <div className="grid grid-cols-7 pb-12 gap-5">
      <p className="text-sm font-light col-span-5  pt-2">
        {aboutMeDescription}
      </p>

      <img
        src={profileImage}
        alt="profile"
        className="rounded-full  object-cover object-center col-span-2 self-center"
      />
    </div>
  );
}
