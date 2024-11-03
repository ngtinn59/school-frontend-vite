type Props = {
  aboutMe: string;
};

export default function AboutMeSection({ aboutMe }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <p className="text-bold text-center md:text-start font-bold col-span-2 !text-base">
        About Me
      </p>

      <p className="text-bold col-span-10 text-base">{aboutMe}</p>
    </div>
  );
}
