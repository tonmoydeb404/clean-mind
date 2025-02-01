type Props = {};

const HeaderSection = (_props: Props) => {
  return (
    <div className="container py-5">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Clean Mind</h1>
        <p className="text-sm">drop all thoughts here</p>
      </div>
    </div>
  );
};

export default HeaderSection;
