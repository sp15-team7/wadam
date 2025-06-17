const WineDetailTitle = ({
  title,
  count,
}: {
  title: string;
  count?: number;
}) => {
  return (
    <div className='mb-[3rem] flex items-center justify-between'>
      <h3 className='txt-xl-bold'>{title}</h3>
      <p>({count}명 참여)</p>
    </div>
  );
};

export default WineDetailTitle;
