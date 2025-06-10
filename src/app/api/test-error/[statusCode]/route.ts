// app/api/test-error/[statusCode]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { statusCode: string } },
) {
  const statusCode = parseInt(params.statusCode);

  if (isNaN(statusCode)) {
    return NextResponse.json(
      { message: 'Invalid status code' },
      { status: 400 },
    );
  }

  if (statusCode === 400) {
    return NextResponse.json(
      {
        message: '잘못된 요청입니다.',
        errors: [{ constraints: '유효성 검사 실패', property: '필드명' }],
      },
      { status: 400 },
    );
  } else if (statusCode === 401) {
    return NextResponse.json(
      { message: '인증되지 않았습니다.' },
      { status: 401 },
    );
  } else if (statusCode === 403) {
    return NextResponse.json({ message: '권한이 없습니다.' }, { status: 403 });
  } else if (statusCode === 404) {
    return NextResponse.json(
      { message: '리소스를 찾을 수 없습니다.' },
      { status: 404 },
    );
  } else if (statusCode >= 500) {
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: statusCode },
    );
  } else {
    return NextResponse.json(
      { message: '알 수 없는 테스트 에러' },
      { status: statusCode },
    );
  }
}
