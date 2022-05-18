import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';

  import * as hkid from "hkid";
  
  @ValidatorConstraint({ async: true })
  export class IsHKIDConstraint implements ValidatorConstraintInterface {
    async validate(str: any, args: ValidationArguments) {
        //return hkid.validate(str);
        var strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // basic check length
        if (str.length < 8)
            return false;
     
        // handling bracket
        if (str.charAt(str.length-3) == '(' && str.charAt(str.length-1) == ')')
            str = str.substring(0, str.length - 3) + str.charAt(str.length -2);
    
        // convert to upper case
        str = str.toUpperCase();
    
        // regular expression to check pattern and split
        var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
        var matchArray = str.match(hkidPat);
    
        // not match, return false
        if (matchArray == null)
            return false;
    
        // the character part, numeric part and check digit part
        var charPart = matchArray[1];
        var numPart = matchArray[2];
        var checkDigit = matchArray[3];
    
        // calculate the checksum for character part
        var checkSum = 0;
        if (charPart.length == 2) {
            checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
            checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
        } else {
            checkSum += 9 * 36;
            checkSum += 8 * (10 + strValidChars.indexOf(charPart));
        }
    
        // calculate the checksum for numeric part
        for (var i = 0, j = 7; i < numPart.length; i++, j--)
            checkSum += j * numPart.charAt(i);
    
        // verify the check digit
        var remaining = checkSum % 11;
        var verify = remaining == 0 ? 0 : 11 - remaining;
    
        return verify == checkDigit || (verify == 10 && checkDigit == 'A');
    }
  }
  
  export function IsHKID(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsHKID,
      });
    };
  }