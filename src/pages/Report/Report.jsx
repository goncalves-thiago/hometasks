// Styles
import './Report.css';

// Hooks
import { useEffect, useState } from 'react';
import { useAuthValue } from '../../Context/AuthContext';
import { useGetReport } from '../../hooks/useGetReport';
import { useNavigate } from 'react-router-dom';

// Plugins
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import {format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Avatar from '../../components/Avatar/Avatar';
import Allowance from '../../components/Allowance';

// Components
import Loading from '../../components/Loading/Loading';

// Locale for date-picker plugin
setDefaultLocale(ptBR);

const Report = () => {

    const [today] = useState(new Date());
    const {userData} = useAuthValue();
    const {reports, loadData: loadReport, loading: reportLoading} = useGetReport(userData.familyId, format(today, 'M'));
    const [selectedDate, setSelectedDate] = useState(today);
    const navigate = useNavigate();

    useEffect(() => {
        loadReport();
    },[loadReport]);
    
    if(reportLoading) return <Loading size="full" />

  return (
    <div className="container" id="family">
        <div className="row d-flex justify-content-center">
            <div className="col-xl-8">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3 align-center justify-content-center">                       
                            <div className="col d-flex align-items-center justify-content-center">
                                <label htmlFor="month" className="form-label text-muted mt-2">Selecione o mês:</label>
                       
                                <DatePicker className="mx-3" id="month" selected={selectedDate} maxDate={today} 
                                dateFormat="MM/yyyy" showMonthYearPicker showTwoColumnMonthYearPicker required onChange={(date) => {setSelectedDate(date)} } />
                            </div>
                        </div>    

                        <table className="table table-responsive table-striped align-middle">

                            <tbody>                           

                                {/* ---Table line--- */}
                                {(reports.length > 0) ? reports.map((report) => (
                                    <tr key={report.user.id}>
                                        <td><Avatar userId={report.user.id} /></td>
                                        <td>{report.user.name}</td>
                                        <td className="table-success">{report.tasks.completed}</td>
                                        <td className="table-danger">{report.tasks.expired}</td>
                                        <td className="table-primary"><Allowance userId={report.user.id} month={format(selectedDate, 'M')}/></td>
                                    </tr>
                                )) : <tr><td className="td-name">Nenhum</td></tr>}
                                {/* ---Table line End--- */}

                            </tbody>
                        </table>

                        <div className="row row-cols-auto justify-content-center">                  
                            {/* ---Back button--- */}
                            <div className="col mt-2">
                                 <button className="btn btn-family" onClick={()=>navigate("/")}>Voltar</button>
                            </div>
                        </div>

                    </div>
                </div>


                
            </div>
        </div>
    </div>
                
  );
};

export default Report;