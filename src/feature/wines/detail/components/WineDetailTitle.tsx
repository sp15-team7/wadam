const WineDetailTitle = ({
  title,
  count,
}: {
  title: string;
  count?: number;
}) => {
  return (
    <div className='flex items-center justify-between'>
      <h3 className='txt-xl-bold'>{title}</h3>
      {count !== undefined && (
        <p className='txt-md-regular text-gray'>({count}명 참여)</p>
      )}
    </div>
  );
};

export default WineDetailTitle;
