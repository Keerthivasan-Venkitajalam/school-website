/* eslint-disable no-unused-vars */
import Banner from '../components/banner/Banner'
import TuitionTable from '../components/table/Table'
import AdmissionForm from '../components/admission-form/admission-form';
import { useData } from '../context/BannerContext'

import { useAdmin } from '../hooks/AdminContext'
import PdfDownloader from '../components/pdfViewer/PdfDownloader'
import { useEffect, useState } from 'react';
import axios from 'axios';
const pdfUrl = new URL('../assets/pdf/SudarshanCV.pdf', import.meta.url).href;
import AdmissionProcess from '../components/CardPages/AdmissionProcess';

// body data of 1st table

const fee_data = [
  {
    program: 'Preschool',
    ageGroup: '3-5',
    annualTuition: '$5000',
    registrationFee: '$100',
    activityFee: '$200',
  },
  {
    program: 'Kindergarten',
    ageGroup: '5-6',
    annualTuition: '$6000',
    registrationFee: '$150',
    activityFee: '$250',
  },
  {
    program: 'Kindergarten',
    ageGroup: '5-6',
    annualTuition: '$6000',
    registrationFee: '$150',
    activityFee: '$250',
  },
  {
    program: 'Kindergarten',
    ageGroup: '5-6',
    annualTuition: '$6000',
    registrationFee: '$150',
    activityFee: '$250',
  },
  {
    program: 'Kindergarten',
    ageGroup: '5-6',
    annualTuition: '$6000',
    registrationFee: '$150',
    activityFee: '$250',
  },
  {
    program: 'Kindergarten',
    ageGroup: '5-6',
    annualTuition: '$6000',
    registrationFee: '$150',
    activityFee: '$250',
  },
  {
    program: 'Kindergarten',
    ageGroup: '5-6',
    annualTuition: '$6000',
    registrationFee: '$150',
    activityFee: '$250',
  },
]

// first table header data //
const fee_headers = [
  { header: 'Program', accessor: 'program' },
  { header: 'Age Group', accessor: 'ageGroup' },
  { header: 'Annual Tuition', accessor: 'annualTuition' },
  { header: 'Registration Fee', accessor: 'registrationFee' },
  { header: 'Activity Fee', accessor: 'activityFee' },
]


// ---------------------------- second table virtual data -----------------------------
const activity_data = [
  {
    activity: 'before and after core',
    fee: '$120/per month',
  },
  {
    activity: 'language',
    fee: '$130/per month',
  },
  {
    activity: 'sports',
    fee: '$120/per month',
  },
]

const activity_headers = [
  { header: 'Additional Service', accessor: 'activity' },
  { header: 'fee', accessor: 'fee' },
]



const AdmissionPage = () => {

  const { admissionPage } = useData()
  const { isAdmin } = useAdmin();
  const [contactData, setContactData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const getFeeData = async () => {
    try {
      let response = await axios.get(`/api/admin/getAllFees`);

      if (response?.data?.status === 200) setContactData(response?.data?.data)
      const fee_headers = response?.data?.data?.map(data => ({ header: data?.programName }));
      setHeaders(fee_headers)

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getFeeData()
  }, [])

  console.log(contactData, "use state data");


  return (
    <div className="min-h-screen w-full dark:bg-darkmode">
      <div className="min-h-screen w-full">

        <Banner
          main={admissionPage.title}
          content={admissionPage.content}
          buttonText={admissionPage.buttonText}
        />

        <div className="p-10 mb-10">
          <TuitionTable columns={fee_headers} data={fee_data}  isAdmin={true} />
        </div>

        <div className="p-10 mb-10">
          <TuitionTable
            columns={activity_headers}
            data={activity_data}
            isAdmin={isAdmin}
          />
          <PdfDownloader />
        </div>

      </div>
      <AdmissionForm />
    </div>
  )
}

export default AdmissionPage
