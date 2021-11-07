import IconFilter from "../components/icon/Filter";
export default function Filter() {
  return (
    <div className="relative flex items-center border border-black rounded-lg px-4 py-2">
      <IconFilter />
      <input
        type="text"
        placeholder="Filter products"
        className="ml-3 focus:outline-none placeholder-gray font-semibold text-sm"
      />
    </div>
  );
}
