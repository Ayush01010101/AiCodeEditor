"use client"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
const UnauthorizedView = () => {

  return (
    <div className=" w-screen flex items-center p-5 justify-center   flex-col gap-6">
      <Item variant="outline" >
        <ItemContent >
          <ItemTitle className="text-3xl font-medium">Unauthorized</ItemTitle>
          <ItemDescription className="text-2xl">
            You are not authorized to view this page
          </ItemDescription>
        </ItemContent>
        <ItemActions>
        </ItemActions>
      </Item>

    </div >
  )
}
export default UnauthorizedView
