export default function SignUpImg({ className }: { className: string }) {
  return (
    <img
      width={980}
      height={980}
      src={"https://aws-service-s3-demo-racso.s3.us-east-2.amazonaws.com/images/registro.jpg"}
      alt="Registro"
      className={className}
    />
  );
}
