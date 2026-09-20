export function CheckItem({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <li className="list-none">
      <label
        htmlFor={id}
        className="focus-within:ring-4 focus-within:ring-turquoise-200 flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-turquoise-50"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 flex-shrink-0 rounded-md border-2 border-turquoise-300 text-turquoise-600 focus:ring-turquoise-400"
        />
        <span className={`text-sm text-diepblauw-800 ${checked ? "text-diepblauw-400 line-through" : ""}`}>
          {label}
        </span>
      </label>
    </li>
  );
}
