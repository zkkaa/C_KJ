import React from 'react';


class CurrentDate extends React.Component {
  render() {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const currentDate = new Date();
    const dayName = days[currentDate.getDay()];
    const monthName = months[currentDate.getMonth()];
    
    return (
      <div>
        {dayName}, {currentDate.getDate()} {monthName} {currentDate.getFullYear()}
      </div>
    );
  }
}

export default CurrentDate;
