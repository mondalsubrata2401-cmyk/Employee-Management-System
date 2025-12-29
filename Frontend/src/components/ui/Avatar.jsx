/**
 * Avatar Component
 * Display user avatar with initials or image
 */
export const Avatar = ({ name, size = "md", src }) => {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
  
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-xl"
  };
  
  return (
    <div className={`${sizes[size]} rounded-full bg-[var(--secondary)] flex items-center justify-center font-semibold text-[var(--text-secondary)] border border-[var(--border)] overflow-hidden`}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
};
