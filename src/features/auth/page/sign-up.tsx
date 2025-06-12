import SignUpImg from "@/assets/signup-img";
import FormSignUp from "../components/form-sign-up";

function SignUp() {
  return (
    <div className=" flex flex-col items-center  md:flex-row gap-4 ">
      <div className="size-full ">
        <FormSignUp />
      </div>
      <div className="size-full hidden md:block ">
        <div className="p-12">
          <SignUpImg className="" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
