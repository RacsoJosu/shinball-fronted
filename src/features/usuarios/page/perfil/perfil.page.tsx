import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Outlet, useNavigate } from "react-router-dom";

function Perfil() {

  const navigate = useNavigate()

  function onChangeTab( event: React.MouseEvent<HTMLElement>,
    tab: string ) {
      navigate({
        pathname:tab
      })

  }

  return (
    <Tabs
        defaultValue="perfil"
      className="w-full border-2"

      >
        <TabsList  className=" rounded-none ">
          <TabsTrigger  onClick={(event) => onChangeTab(event, "")} value={"perfil"}  className="rounded-none">
            Informacion
          </TabsTrigger>
        <TabsTrigger onClick={(event) => onChangeTab(event, "cuenta")} className="rounded-none" value="account">Cuenta</TabsTrigger>
        </TabsList>
        <Outlet/>
      </Tabs>

  );
}

// function PerfilOld() {
//   const userData = useRouteLoaderData("root") as InfoUserType;
//   const birthDate = parseISO(userData.birthDate);
//   const createdAt = parseISO(userData.createdAt);

//   const birthDateFormatted = format(birthDate, "dd/MM/yy");
//   const age = differenceInYears(new Date(), birthDate);
//   const createdAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: es })

//   return (
//     <div className="w-full flex items justify-around p-8 h-full gap-8">

//       <div className=" shadow-lg   border-1 w-[300px] rounded-xl flex flex-col gap-8 items-center justify-start ">

//         <div className="flex flex-col items-center h-1/2 justify-center gap-2">
//           <img src="/public/icon.png" alt="" className="rounded-full size-20" />
//           <p className="text-center font-medium text-xl">{userData.name}</p>
//           <p className="text-center font-normal text-md text-gray-400"><span className="font-semibold"> </span>{ userData.email}</p>


//         </div>

//         <div className="flex flex-col items-center gap-2 h-1/2">



//           <div
//           className="flex flex-col gap-2"
//           >
//             <div className=" flex flex-col items-center justify-center ">
//               <span className="font-semibold"> Fecha de nacimiento:</span>
//             <p className="text-center font-normal text-md">{birthDateFormatted}</p>

//             </div>


//             <div className=" flex flex-col items-center justify-center ">
//               <span className="font-semibold"> Edad:</span>
//               <p className="text-center font-normal text-md">{age}{" Años" }</p>

//             </div>


//             <div className=" flex flex-col items-center justify-center ">
//               <span className="font-semibold"> Creado: </span>

//             <p className="text-center font-normal text-md">{createdAgo}</p>
//             </div>


//           </div>

//         </div>



//       </div>
//       <Tabs
//         defaultValue="actualizar"
//         className="w-1/2 flex justify-center items-center"
//       >
//         <TabsList className="w-full">
//           <TabsTrigger value="actualizar" className="">
//             Actualizar
//           </TabsTrigger>
//           <TabsTrigger value="password">Password</TabsTrigger>
//         </TabsList>
//         <TabsContent value="actualizar" className="h-auto">
//           <UpdateAccountForm />
//         </TabsContent>
//         <TabsContent value="password">Change your password here.</TabsContent>
//       </Tabs>
//     </div>
//   );
// }




export default Perfil;
