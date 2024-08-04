interface Props {
  title: string;
  value: string;
  placeholder?: string;
  onChange?: () => void;
}

const ProfileInput = ({ title, value, placeholder, onChange }: Props) => {
  return (
    <div className="w-full">
      <p className="text-gray-600">{title}</p>
      <input
        className="w-full py-2 h-[40px] border-b"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

ProfileInput.defaultProps = {
  placeholder: null,
  onChange: undefined,
};

export default ProfileInput;
