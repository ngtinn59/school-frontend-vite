import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa";

const Buttons: React.FC = () => {
  return (
    <>
      <button className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-white">
        Apply
      </button>

      <button className="flex items-center gap-1 rounded-md border border-[var(--color-primary)] px-4 py-2 text-[var(--color-primary)]">
        <FaHeart />
        <FaRegHeart />
        Save
      </button>

      <button className="flex items-center gap-1 rounded-md border border-[var(--color-primary)] px-4 py-2 text-[var(--color-primary)]">
        <FaShare />
        Share
      </button>
    </>
  );
};

export default Buttons;
