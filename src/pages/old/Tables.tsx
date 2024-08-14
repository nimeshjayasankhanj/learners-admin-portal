import Breadcrumb from '../../components/atoms/Breadcrumbs/Breadcrumb';
import TableOne from '../../components/old/Tables/TableOne';
import TableThree from '../../components/old/Tables/TableThree';
import TableTwo from '../../components/old/Tables/TableTwo';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
