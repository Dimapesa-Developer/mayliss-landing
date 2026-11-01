import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Subrayado visible siempre (CTA); si no, crece al hover */
  fijo?: boolean;
};

/** Link de texto con subrayado que crece de izquierda a derecha (scaleX 0 → 1, 300ms) */
export function UnderlineLink({ fijo = false, className = "", children, ...props }: Props) {
  const externo = props.href?.startsWith("http") && !props.href.includes("mayliss.com.mx");
  return (
    <a
      {...props}
      {...(externo ? { target: "_blank", rel: "noopener" } : {})}
      className={`group relative inline-block pb-1 ${className}`}
    >
      {children}
      {fijo && <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-current opacity-30" />}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-mayliss group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  );
}
