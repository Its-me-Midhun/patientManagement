import initiateContractTransaction from './initiateContractTransaction';
import { useDispatch, useSelector } from 'react-redux';
import VACCINATION_ABI from './VACCINE_ABI';
let networks;
const vaccineVerification = async ({
  address,
  netVer,
  vaccinationCode,
  web3,
  dispatch,
}) => {
  const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

  if (netVer === 80001) {
    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );
    const result = await smartContract.methods
      .verifyCertificateByCertificate(vaccinationCode)
      .call();

    console.log('result', result);
    const certificateNumber = result.certificateNumber;
    const patientName = web3.utils.hexToUtf8(result.patientName);
    const patientUUID = web3.utils.hexToUtf8(result.patientUUID);
    const patientRegId = result.patientRegId;
    const vaccineName = web3.utils.hexToUtf8(result.vaccineName);
    const endTimestamp = result.vaccineTakenDatetime;
    const startTimestamp = result.issuedDateTime;
    const startDate = new Date(startTimestamp * 1000);
    const startHours = startDate.getHours();
    const startAMPM = startHours >= 12 ? 'PM' : 'AM';

    const endDate = new Date(endTimestamp * 1000);
    const endHours = endDate.getHours();
    const endAMPM = endHours >= 12 ? 'PM' : 'AM';
    const vaccineTakenDatetime = endHours + ':00' + endAMPM;
    const disease = web3.utils.hexToUtf8(result.disease);
    const issuerName = web3.utils.hexToUtf8(result.issuerName);
    const issuerId = web3.utils.hexToUtf8(result.issuerId);
    const issuedDateTime = startAMPM;
    const antigen = web3.utils.hexToUtf8(result.antigen);

    const decoded = {
      certificateNumber,
      patientName,
      patientUUID,
      patientRegId,
      vaccineName,
      vaccineTakenDatetime,
      disease,
      antigen,
      issuerName,
      issuerId,
      issuedDateTime,
    };
    return decoded;
  } else {
    console.log('netVer', netVer);
    alert('Mumbai Network Only Supported');
  }
};

export default vaccineVerification;
