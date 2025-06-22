import {
  type CreateWineRequest,
  type CreateWineResponse,
  createWineResponseSchema,
  type DeleteWineResponse,
  deleteWineResponseSchema,
  type GetWineDetailResponse,
  getWineDetailResponseSchema,
  type GetWinesResponse,
  getWinesResponseSchema,
  type UpdateWineRequest,
  UpdateWineResponse,
  updateWineResponseSchema,
  type WineTypeEnum,
} from '@/feature/wines/schema/wine.schema';
import { apiClient } from '@/shared/libs/api/apiClient';

/**
 * @file 와인(Wine) 도메인 관련 API 요청을 처리하는 서비스입니다.
 * @description ky 인스턴스(`apiClient`)를 사용하여 각 API 엔드포인트에 맞는 요청을 보내고,
 * Zod 스키마를 통해 응답 데이터의 타입을 검증하여 안정성을 보장합니다.
 * 모든 함수는 API 에러 발생 시 ky 훅에서 처리된 에러 메시지를 포함한 예외를 throw합니다.
 */

/**
 * 와인 목록 조회를 위한 쿼리 파라미터 타입 정의
 * @property {number} limit - 한 페이지에 가져올 와인 개수
 * @property {number} [cursor] - 페이지네이션을 위한 커서 ID (이 ID 다음의 데이터를 가져옴)
 * @property {WineTypeEnum} [type] - 필터링할 와인 종류 (RED, WHITE, SPARKLING)
 * @property {number} [minPrice] - 최소 가격 필터
 * @property {number} [maxPrice] - 최대 가격 필터
 * @property {number} [rating] - 최소 평점 필터
 * @property {string} [name] - 이름으로 검색할 키워드
 */
interface GetWinesParams {
  limit: number;
  cursor?: number;
  type?: WineTypeEnum;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

/**
 * 서버에 새로운 와인 정보를 등록하고, 생성된 와인의 전체 데이터를 반환합니다.
 *
 * @description **API Endpoint**: `POST /wines`
 * @param {CreateWineRequest} wineData - 생성할 와인의 정보. `name`, `type`, `price` 등이 포함됩니다.
 * @returns {Promise<CreateWineResponse>} 생성된 와인의 전체 정보가 담긴 Promise 객체.
 * @throws {Error} API 요청 실패 시, 서버에서 받은 메시지를 포함한 에러가 발생합니다.
 * @example
 * try {
 *   const newWine = await createWine({
 *     name: '새로운 와인',
 *     type: 'RED',
 *     price: 50000,
 *     region: '프랑스',
 *     image: 'https://example.com/wine.png',
 *   });
 *   console.log('생성된 와인:', newWine);
 * } catch (error) {
 *   console.error(error.message); // 예: "이미 존재하는 와인입니다."
 * }
 */
export const createWine = async (
  wineData: CreateWineRequest,
): Promise<CreateWineResponse> => {
  const response = await apiClient.post('wines', { json: wineData }).json();
  return createWineResponseSchema.parse(response);
};

/**
 * 필터링 및 페이지네이션 조건에 따라 와인 목록을 조회합니다.
 *
 * @description **API Endpoint**: `GET /wines`
 * @param {GetWinesParams} params - 목록 조회를 위한 쿼리 파라미터 객체. `limit`은 필수입니다.
 * @returns {Promise<GetWinesResponse>} 와인 목록 배열(`list`), 전체 개수(`totalCount`), 다음 페이지 커서(`nextCursor`)를 포함하는 객체.
 * @throws {Error} API 요청 실패 시 에러가 발생합니다.
 * @example
 * try {
 * const { list, totalCount } = await getWines({ limit: 10, type: 'RED' });
 * console.log(`레드 와인 ${totalCount}개 중 ${list.length}개를 가져왔습니다.`);
 * } catch (error) {
 * console.error(error.message);
 * }
 */
export const getWines = async (
  params: GetWinesParams,
): Promise<GetWinesResponse> => {
  const response = await apiClient
    .get('wines', {
      searchParams: Object.fromEntries(
        Object.entries(params)
          .filter(([, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      ),
    })
    .json();
  return getWinesResponseSchema.parse(response);
};

/**
 * 특정 ID를 가진 와인의 모든 상세 정보를 가져옵니다.
 *
 * @description **API Endpoint**: `GET /wines/{id}`
 * @param {number} wineId - 조회할 와인의 고유 ID.
 * @returns {Promise<GetWineDetailResponse>} 와인의 상세 정보와 전체 리뷰 목록(`reviews`), 평점 분포(`avgRatings`)가 포함된 객체.
 * @throws {Error} 존재하지 않는 ID 요청 시 "404 Not Found" 등의 에러가 발생합니다.
 * @example
 * try {
 * const wineDetail = await getWineDetail(123);
 * console.log(wineDetail.name, '리뷰 개수:', wineDetail.reviews.length);
 * } catch (error) {
 * console.error(error.message); // 예: "와인을 찾을 수 없습니다."
 * }
 */
export const getWineDetail = async (
  wineId: number,
): Promise<GetWineDetailResponse> => {
  const response = await apiClient.get(`wines/${wineId}`).json();
  return getWineDetailResponseSchema.parse(response);
};

/**
 * 기존 와인의 정보를 부분적으로 수정합니다.
 *
 * @description **API Endpoint**: `PATCH /wines/{id}`
 * @param {number} wineId - 수정할 와인의 고유 ID.
 * @param {UpdateWineRequest} wineData - 수정할 필드만 포함된 부분 객체.
 * @returns {Promise<UpdateWineResponse>} 수정이 완료된 후의 와인 전체 정보.
 * @throws {Error} 권한이 없거나(403) 존재하지 않는 와인(404)일 경우 에러가 발생합니다.
 * @example
 * try {
 * const updatedWine = await updateWine(123, { price: 55000 });
 * console.log('가격 수정 완료:', updatedWine.price);
 * } catch (error) {
 * console.error(error.message); // 예: "수정 권한이 없습니다."
 * }
 */
export const updateWine = async (
  wineId: number,
  wineData: UpdateWineRequest,
): Promise<UpdateWineResponse> => {
  const response = await apiClient
    .patch(`wines/${wineId}`, { json: wineData })
    .json();
  return updateWineResponseSchema.parse(response);
};

/**
 * 특정 ID의 와인을 삭제합니다.
 *
 * @description **API Endpoint**: `DELETE /wines/{id}`
 * @param {number} wineId - 삭제할 와인의 고유 ID.
 * @returns {Promise<DeleteWineResponse>} 삭제된 와인의 ID를 포함하는 객체 (`{ id: 123 }`).
 * @throws {Error} 권한이 없거나(403) 존재하지 않는 와인(404)일 경우 에러가 발생합니다.
 * @example
 * try {
 * const response = await deleteWine(123);
 * console.log(`${response.id}번 와인이 삭제되었습니다.`);
 * } catch (error) {
 * console.error(error.message); // 예: "삭제 권한이 없습니다."
 * }
 */
export const deleteWine = async (
  wineId: number,
): Promise<DeleteWineResponse> => {
  const response = await apiClient.delete(`wines/${wineId}`);

  // 204 No Content 응답인 경우 응답 바디가 없으므로 ID만 반환
  if (response.status === 204) {
    return deleteWineResponseSchema.parse({ id: wineId });
  }

  // 다른 상태 코드인 경우 JSON 응답을 파싱
  const responseData = await response.json();
  return deleteWineResponseSchema.parse(responseData);
};

/**
 * 와인 이미지를 업로드합니다.
 *
 * @description **API Endpoint**: `POST /images/upload`
 * @param {File} file - 업로드할 이미지 파일.
 * @returns {Promise<string>} 업로드된 이미지의 URL.
 * @throws {Error} 업로드 실패 시 에러가 발생합니다.
 * @example
 * try {
 * const imageUrl = await uploadWineImage(imageFile);
 * console.log('업로드된 이미지 URL:', imageUrl);
 * } catch (error) {
 * console.error(error.message); // 예: "이미지 업로드에 실패했습니다."
 * }
 */
export const uploadWineImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  const fileExtension = file.name.split('.').pop();
  const newFileName = `${crypto.randomUUID()}.${fileExtension}`;
  const newFile = new File([file], newFileName, { type: file.type });
  formData.append('image', newFile);

  const response = await apiClient
    .post('images/upload', {
      body: formData,
      headers: {
        'Content-Type': undefined,
      },
    })
    .json<{ url: string }>();

  if (!response.url) throw new Error('이미지 업로드 실패');
  return response.url;
};
