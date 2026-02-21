import { FC, useState } from "react"
import Filetrayheader from "./File-tray-header"
import { useCreatefile } from "./useFiles"
import Addnewfileinput from "./Add-new-file-input"
import { Id } from "../../../../../convex/_generated/dataModel"
import { usegetFolderFiles } from "./useFiles"
import { useParams } from "next/navigation"
import Renderfiles from "./Renderfiles"
interface props {
}
const FileTrayView: FC<props> = ({ }) => {
  const params = useParams()
  const [filetype, setfiletype] = useState<'folder' | 'file'>('file')
  const files = usegetFolderFiles(params.Projectid as Id<"Project">)


  return (
    <div>
      <Filetrayheader HandlCreateFile={() => {
        setfiletype('file')
      }}
        HandleCreateFolder={() => {
          setfiletype('folder')
        }}
      />
      {/* <Addnewfileinput type={filetype} onSubmit={() => { */}
      {/*   console.log('submit trigger') */}
      {/**/}
      {/**/}
      {/* }} padding={4} /> */}
      {/**/}
      <Renderfiles filedata={
        [
          {
            "_creationTime": 1771628612925.0103,
            "_id": "jd7e36g1j8s8g6x09vegtm7y0x81gp8e",
            "name": "ayush",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "folder",
            "updatedAt": 1771628612843
          },
          {
            "_creationTime": 1771684259089.132,
            "_id": "jd7dsxgwy0b0r0r9xjvgp06q4s81j0cb",
            "name": "god",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "folder",
            "updatedAt": 1771684258993
          },
          {
            "_creationTime": 1771684273141.608,
            "_id": "jd79d4hxvg91nps4bta2t934nh81j2e7",
            "name": "god",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "folder",
            "updatedAt": 1771684273040
          },
          {
            "_creationTime": 1771685836847.2644,
            "_id": "jd716x6xwry4jza3rbpfr1tx9s81jd8t",
            "name": "godhello",
            "parentId": "jd7e36g1j8s8g6x09vegtm7y0x81gp8e",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "folder",
            "updatedAt": 1771685836756
          },
          {
            "_creationTime": 1771695513288.8372,
            "_id": "jd7c3s7ev67k8eyp0dcdyb7z6h81j8x4",
            "name": "hacker.cpp",
            "parentId": "jd7e36g1j8s8g6x09vegtm7y0x81gp8e",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "file",
            "updatedAt": 1771695513241
          },
          {
            "_creationTime": 1771698964661.9387,
            "_id": "jd73wnfm3v8pye36n3awy1ykz181ktwh",
            "name": "god",
            "parentId": "jd7dsxgwy0b0r0r9xjvgp06q4s81j0cb",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "folder",
            "updatedAt": 1771698964558
          },
          {
            "_creationTime": 1771699133792.7314,
            "_id": "jd78cbyf0k3mvdph6ynhbfp12981kxef",
            "name": "god.json",
            "parentId": "jd7e36g1j8s8g6x09vegtm7y0x81gp8e",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "file",
            "updatedAt": 1771699133684
          },
          {
            "_creationTime": 1771700188755.088,
            "_id": "jd79k7nmd1azqdg9xt86m87y6581krv8",
            "name": "folderinfolder",
            "parentId": "jd7e36g1j8s8g6x09vegtm7y0x81gp8e",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "folder",
            "updatedAt": 1771700188648
          },
          {
            "_creationTime": 1771700220345.966,
            "_id": "jd7dv4ttm43gbry47jsw1w768n81jckc",
            "name": "fileinfolder.ts",
            "parentId": "jd79k7nmd1azqdg9xt86m87y6581krv8",
            "projectId": "j979m52fv77n5tw8mg4xv73f49814rsj",
            "type": "file",
            "updatedAt": 1771700220244
          }
        ]


      } />
    </div >
  )
}

export default FileTrayView 
