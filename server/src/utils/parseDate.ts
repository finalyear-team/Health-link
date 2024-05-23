import { parse, isValid } from 'date-fns';

// Define possible date formats
const dateFormats = [
        'dd/MM/yyyy',
        'dd-MM-yyyy',
        'dd/MMM/yyyy',
        'dd.MM.yyyy',
        'MM/dd/yyyy',
        'MM-dd-yyyy',
        'MM.dd.yyyy',
        'yyyy/MM/dd',
        'yyyy-MM-dd',
        'dd MMMM yyyy',
        'MMMM dd, yyyy',
        'dd MMM yyyy',
        'MMM dd, yyyy',
        'yyyy.MM.dd',
        'dd-MM-yy',
        'MM/dd/yy',
        'yyyyMMdd',
        'MMddyyyy',
        'ddMMyyyy',
        'yyyy MM dd',
        'yyyy.MM.dd G',
        'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ',
        'EEE, MMM d, \'\'yy',
        'EEE, d MMM yyyy HH:mm:ss Z',
        'yyyy-MM-dd\'T\'HH:mm:ss',
        'EEE, dd MMM yyyy HH:mm:ss z',
        'd MMM yyyy',
        'MMMM dd',
        'yyyy-MM',
        'yyMMdd',
        'dd MMMM yyyy G',
        'd/M/yyyy',
        'M/d/yyyy',
        'MMMyyyy',
        'MMM-yyyy',
        'dd/MMMM/yyyy',
        'd-MMM-yyyy',
        'd.M.yyyy',
        'MMMM-yyyy',
        'MMM d, yyyy'
      
      
];

export const parseDate=(dateString: string): string | null=> {
  for (const format of dateFormats) {

    const parsedDate = parse(dateString, format, new Date());
    console.log(parsedDate)
    if (isValid(parsedDate)) {
        console.log(parsedDate.toISOString())
      return parsedDate.toISOString();
    }
  }
  return null;
}