import registroImg from "./registro.jpg";

export default function SignUpImg({ className }: { className: string }) {
  return <img src={registroImg} alt="Registro" className={className} />;
}
