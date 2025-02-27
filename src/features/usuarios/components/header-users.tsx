import Input from "@/shared/components/input"

function HeaderUsers() {
  return (
    <div
      className="flex gap-4 flex-1 p-12">
      <Search/>

    </div>
  )
}





function Search() {
  return (
    <Input type="text" placeholder="Busca un usuario" className="bg-white text-gray-800 w-full "/>
  )
}


export default HeaderUsers
