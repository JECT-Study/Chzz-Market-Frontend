interface IconProps {
  name: string;
  style?: string;
  ariaLabel?: string;
}

export const Icon = ({ name, style, ariaLabel = name }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={style} aria-label={ariaLabel}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}