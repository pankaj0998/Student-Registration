import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from "class-validator";
import { ClassCategory, EductionBoard, HigherSecondaryStandard, InstituteType, PrePrimaryStandard } from "../enum/enum";


export class SchoolDto {
    @IsNotEmpty()
    @IsEnum(EductionBoard)
    educationBoard: EductionBoard;

    @IsNotEmpty()
    @IsString()
    languageMedium: string;

    @IsNotEmpty()
    @IsEnum(ClassCategory)
    classCategory : ClassCategory;

    @ValidateIf(request => request && request.classCategory === ClassCategory.PrePrimary)
    @IsNotEmpty()
    @IsEnum(PrePrimaryStandard)
    prePrimaryStandard?: PrePrimaryStandard
    
    @ValidateIf(request => request && request.classCategory === ClassCategory.HigherSecondary)
    @IsNotEmpty()
    @IsEnum(EductionBoard)
    higherStanadard?:HigherSecondaryStandard

    @ValidateIf(request => request && request.higherStanadard === HigherSecondaryStandard.NINTH)
    @IsNotEmpty()
    subject?: string[];
}


export class CollegeDto {
    @IsNotEmpty()
    @IsString()
    university: string;

    @IsNotEmpty()
    @IsString()
    degreeType: string;

    @IsNotEmpty()
    @IsString()
    departmentType: string;
}

export class CompetitiveExamCenter {
    @IsNotEmpty()
    @IsString()
    examType: string;

    @IsNotEmpty()
    @IsString()
    course: string;
}

export class RegistrationDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[6-9][0-9]{9}$/)
    contactNumber: string;

    @IsNotEmpty()
    @IsEnum(InstituteType)
    instituteType: InstituteType;

    @IsNotEmpty()
    @ValidateIf(request => request && request.instituteType === InstituteType.School)
    school?: SchoolDto

    @IsNotEmpty()
    @ValidateIf(request => request && request.instituteType === InstituteType.College)
    college?: CollegeDto

    @IsNotEmpty()
    @ValidateIf(request => request && request.instituteType === InstituteType.CompetitiveExamCenter)
    competitiveExam?: CompetitiveExamCenter

}