import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../../../../../auth/auth';
import { Patient } from '../../../../Types/Patient';

interface FormData {
  patientId: string;
  from: string;
  to: string;
  patient: Patient | null;
}

interface TransferPatientProps{
	patient: Patient;
	isOpen: boolean;
  onClose: () => void;
	onSubmit: (patient: FormData)=>void
}

const TransferPatientModal: React.FC<TransferPatientProps> = ({patient,isOpen,onClose,onSubmit}) => {
  const token = useRecoilValue(authState);
  const [formData, setFormData] = useState<FormData>({
    patientId: patient.patientId,
    from: patient.patientType,
    to: patient.patientType==="INPATIENT"?"OUTPATIENT":"INPATIENT",
    patient: patient,
  });

  return (
		<>
		{isOpen && (
			<div className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex items-center justify-center min-h-screen">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
					<div className="relative bg-white rounded-lg p-8 w-3/4">
						<h1 className="w-full px-2 font-extrabold text-2xl mb-6">Trasnfer Patient: {patient.patientId}</h1>
						<form className="w-full mt-8 px-4" onSubmit={(event)=> {event.preventDefault();onSubmit(formData)}}>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="patientId">Patient ID*</label>
								<input
									type="text"
									id="patientId"
									name="patientId"
									value={formData.patientId}
									readOnly
									className="w-full p-2 border focus:border-interactive04"
								/>
							</div>
							<div>
								<label htmlFor="from">From*</label>
								<input
									type="text"
									id="from"
									name="from"
									value={formData.patient?.patientType}
									onChange={(e) => setFormData({ ...formData, from: e.target.value })}
									className="w-full p-2 border focus:border-interactive04"
									disabled
								/>
							</div>
							<div>
								<label htmlFor="to">To*</label>
								<select
									id="to"
									name="to"
									value={formData.patient?.patientType==="INPATIENT"?"OUTPATIENT":"INPATIENT"}
									onChange={(e) => setFormData({ ...formData, to: e.target.value })}
									className="w-full p-2 border focus:border-interactive04"
									disabled
								>
									<option value="">Select...</option>
									<option value="INPATIENT">INPATIENT</option>
									<option value="OUTPATIENT">OUTPATIENT</option>
								</select>
							</div>
						</div>
						<div className="mt-4 px-8 flex justify-center gap-8">
							<button
								type="submit"
								className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary"
							>
								Submit
							</button>
							<button
								className="bg-interactive01 text-text04 px-16 py-2 rounded-lg hover:bg-hoverPrimary"
								onClick={onClose}
							>
								Back
							</button>
						</div>
						</form>
					</div>
				</div>
			</div>)}
		</>
  );
};

export default TransferPatientModal;
