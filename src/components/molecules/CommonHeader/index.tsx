export default function CommonHeader({ title }) {
  return (
    <div
      className={
        "w-full py-4 bg-white text-center flex items-center justify-center border-b-gray-300 border-[1px]"
      }
    >
      <div className={"text-black font-bold text-2xl"}>{title}</div>
    </div>
  );
}
