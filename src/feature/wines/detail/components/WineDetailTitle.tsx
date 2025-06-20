const WineDetailTitle = ({
  title,
  count,
}: {
  title: string;
  count?: number;
}) => {
  return (
    <div className='flex items-center justify-between'>
      <h3 className='md:txt-xl-bold txt-2lg-bold'>{title}</h3>
      {count !== undefined && (
        <p className='md:txt-md-regular txt-sm-regular text-gray'>
          ({count}명 참여)
        </p>
      )}
    </div>
  );
};

export default WineDetailTitle;
