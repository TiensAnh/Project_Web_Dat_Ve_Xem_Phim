package com.example.backend.service;


import com.example.backend.dto.RegisterRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.error.ErrorCode;
import com.example.backend.exception.BusinessException;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    //Ham khoi tao
    public AuthService (
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ){
        this.userRepository = userRepository;
        this.passwordEncoder =passwordEncoder;
    }
    // Hàm hash pass
    private String hashPassword(String password){
        String hashPass=  passwordEncoder.encode(password);
        return hashPass;
    }

    // hàm kiểm tra dữ liệu đầu vào
    public void registerCheck(
            String fullName,
            String email,
            String phone,
            String password
    ){
        // kiem tra null
        if(
                fullName == null || fullName.isBlank() ||
                email == null || email.isBlank()||
                phone == null || phone.isBlank()||
                password == null ||password.isBlank()
        ){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Vui lòng nhập đầy đủ họ tên, email, số điện thoại và mật khẩu."
            );
        }

        // chuan hoa lai data
        String cleanFullName = fullName.trim();
        String cleanEmail = email.trim().toLowerCase();
        String cleanPhone = phone.trim();

        // START KIEM TRA DINH DANG FULL NAME
        if(cleanFullName.length()>255){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Tên không được vượt quá 255 ký tự."
            );
        }

        // END KIEM TRA DINH DANG FULL NAME

        // START KIEM TRA DINH DANG EMAIL

        if(cleanEmail.length() > 255){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Email không được vượt quá 255 ký tự."
            );
        }
        if (cleanEmail.contains(" ")){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Định dạng email không hợp lệ vui lòng thử lại!"
            );
        }
        int atIndex = cleanEmail.indexOf("@");
        int lastIndex= cleanEmail.lastIndexOf("@");
        boolean hasInvalid = atIndex!= lastIndex || atIndex<= 0 || atIndex == cleanEmail.length()-1;
        if (hasInvalid){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Định dạng email không hợp lệ vui lòng thử lại!"
            );
        }
        int atIndexDot = cleanEmail.indexOf(".",atIndex);
        boolean hasInvalidDot = atIndexDot <= atIndex+1||atIndexDot == cleanEmail.length()-1;
        if(hasInvalidDot){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Định dạng email không hợp lệ vui lòng thử lại!"
            );
        }

        // END KIEM TRA DINH DANG EMAIL

        // START KIEM TRA DINH DANG PHONE

        if(cleanPhone.length()<10|| cleanPhone.length()>11){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và gồm 10–11 chữ số)."
            );
        }
        if(!cleanPhone.startsWith("0")){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và gồm 10–11 chữ số)."
            );
        }
        for(char p :  cleanPhone.toCharArray()){
            if(!Character.isDigit(p)){
                throw new BusinessException(
                        ErrorCode.INVALID_REGISTER_DATA,
                        "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và gồm 10–11 chữ số)."
                );
            }
        }

        //END KIEM TRA DINH DANG PHONE

        // START KIEM TRA DINH DANG MAT KHAU
        if(password.length() > 72|| password.length() <6){
            throw new BusinessException(
                    ErrorCode.INVALID_REGISTER_DATA,
                    "Mật khẩu phải từ 6 đến 72 ký tự."
            );
        }

        //END KIEM TRA DINH DANG MAT KHAU
    }

    // hàm đăng kí
    public UserResponse register (RegisterRequest request){
        if(request == null){
            throw new BusinessException(ErrorCode.INVALID_REGISTER_DATA);
        }
        registerCheck(request.fullName(), request.email(), request.phone(),request.password());
        String cleanFullName = request.fullName().trim();
        String cleanEmail = request.email().trim().toLowerCase();
        String cleanPhone = request.phone().trim();
        List<UserResponse> emailCheck = userRepository.findUserByEmail(cleanEmail);
        if(!emailCheck.isEmpty()){
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXIST);
        }
        String hashPass = passwordEncoder.encode(request.password());
        userRepository.registerUser(cleanFullName,cleanEmail,cleanPhone,hashPass);
        List<UserResponse> accountRegister = userRepository.findUserByEmail(cleanEmail);
        UserResponse  createUser = accountRegister.getFirst();
        return createUser;
    }

}
