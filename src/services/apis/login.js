import AuthInterceptor from '../AuthInterceptor';

// sms 인증 문자 발송 
// * require data
//  - phoneNumber : 휴대전화번호
//  - displayName : 실명
export function authSMS(queryStringRequest) {
	return AuthInterceptor({
		url: '/auth/sms',
		method: 'post',
		data: queryStringRequest,
	});
}

// 로그인 (with 휴대전화 인증)
// * require data
//  - phoneNumber : 휴대전화번호
//  - authNumber : 인증번호
//  - displayName : 실명
//  - pushToken : 추후 추가 예정 (일단은 빈 string 보내기)
export function authPhoneSignin(queryStringRequest) {
	return AuthInterceptor({
		url: '/auth/phone/signin',
		method: 'post',
		data: queryStringRequest,
	});
}
