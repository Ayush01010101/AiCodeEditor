import { Input } from "@/components/ui/input";
import { FC } from "react";
import { FileIcon } from "@react-symbols/icons/utils";
import { useState } from "react";
interface props {
  padding: number;
  onSubmit: () => void;

}
const Addnewfileinput: FC<props> = ({ onSubmit, padding }) => {
  const [filename, setfilename] = useState<string>("")
  return (
    <div >
      <div className={`p-2 flex gap-2 pl-${padding}`}>
        <FileIcon fileName={filename} />
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit()
            }

          }}
          onChange={(e) => setfilename(e.target.value)} placeholder="name" className="w-full" />

      </div>
    </div >
  )

}

export default Addnewfileinput
