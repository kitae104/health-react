import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const Profile = () => {

    const [userData, setUserData] = useState(null);  // 사용자 기본 정보
    const [patientData, setPatientData] = useState(null); // 환자 정보

    const [error, setError] = useState(''); // 에러 메시지
    const [uploading, setUploading] = useState(false); // 업로드 상태
    const [uploadError, setUploadError] = useState(''); // 업로드 에러 메시지
    const [uploadSuccess, setUploadSuccess] = useState(''); // 업로드 성공 메시지
    
    const navigate = useNavigate(); // 페이지 이동 훅

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userResponse = await apiService.getUserDetails(); // 사용자 기본 정보 API 호출

            if(userResponse.data.statusCode === 200) {
                setUserData(userResponse.data.data); // 사용자 기본 정보 설정

                if(userResponse.data.data.roles.some(role => role.name === 'PATIENT')) {
                    const patientResponse = await apiService.getMyPatientProfile(); // 환자 정보 API 호출
                    if(patientResponse.data.statusCode === 200) {
                        setPatientData(patientResponse.data.data); // 환자 정보 설정
                    } else {
                        setError('환자 정보를 불러오는 데 실패했습니다.');
                    }
                }
            }
        } catch (error) {
            setError('사용자 정보를 불러오는 데 실패했습니다.');
            console.error('사용자 정보를 가져오는데 실패했습니다.', error);
        }
    };

    const handleUpdateProfile = () => {
        navigate('/update-profile');    // 프로필 수정 페이지로 이동
    };

    const handleUpdatePassword = () => {
        navigate('/update-password'); // 비밀번호 수정 페이지로 이동
    };


    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0]; // 선택된 파일 가져오기
        if (!file) return;

        // 파일 타입 및 크기 검증
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        if (!validTypes.includes(file.type)) {
            setUploadError('Please select a valid image file (JPEG, PNG, GIF)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB 제한
            setUploadError('File size should be less than 5MB');
            return;
        }

        setUploading(true);
        setUploadError('');
        setUploadSuccess('');

        try {
            const response = await apiService.uploadProfilePicture(file); // 프로필 사진 업로드 API 호출
            if(response.data.statusCode === 200) {
                setUploadSuccess('Profile picture updated successfully!');
                fetchUserData(); // 사용자 데이터 다시 불러오기
                event.target.value = ''; // 파일 입력 초기화
            } else {
                setUploadError(response.data.message || 'Failed to upload profile picture.');
            }
        } catch (error) {
            setUploadError(error.response?.data?.message || 'An error occurred while uploading the profile picture.');
            console.error('프로필 사진 업로드 실패:', error);
        } finally {
            setUploading(false);
        }
    };

    const formData = (dataString) => {
        if(!dataString) return "Not provided";
        return new Date(dataString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatBloodGroup = (bloodGroup) => {
        if(!bloodGroup) return "Not provided";
        return bloodGroup.replace('_', ' ');
    };

    const getProfilePictureUrl = () => {
        if( !userData?.getProfilePictureUrl ) {
            return null;
        }
        return userData.getProfilePictureUrl;
    };


    return (
        <div className="profile-page">
            <h1>프로필 페이지</h1>
            <p>여기에 프로필 정보가 표시됩니다.</p>
        </div>
    );
}

export default Profile;

