import Image from 'next/image';

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'
      onClick={handleBackdropClick}
    >
      {/* 헤더 영역 */}
      <div>
        <h2>제목</h2>
        <button>
          <Image
            src='/icons/ui/icon-close.svg'
            alt='close'
            width={14}
            height={14}
          />
        </button>
      </div>
      {/* 본문 영역 */}
      <div>{children}</div>
    </div>
  );
};

export default Modal;
