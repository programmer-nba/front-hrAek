export default [
  {
    component: 'CNavItem',
    name: 'หน้าแรก',
    to: '/',
    icon: 'cil-speedometer',
    badge: {
      color: 'danger',
      text: 'NEW',
    },
    textColor: '#FEFAF6',
  },
  {
    component: 'CNavTitle',
    name: 'Theme',
    textColor: '#FEFAF6',

  },
  
  {
    component: 'CNavItem',
    name: 'เวลาเข้างาน',
    to: '/TimeToWork',
    icon: 'cil-drop',
    textColor: '#FEFAF6',

  },

  {
    component: 'CNavTitle',
    name: 'Components',
    textColor: '#F6F5F2',

  },
  {
    component: 'CNavGroup',
    name: 'พนักงาน',
    textColor: '#F6F5F2',

    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        icon: 'cil-speedometer',
        textColor: '#F6F5F2',

        name: 'พนักงานทั้งหมด',
        to: '/Employee',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'คำขอบันทึกข้อความ',
    textColor: '#F6F5F2',

    to: '/Request/Record',
    icon: 'cil-drop',
  },


  {
    component: 'CNavItem',
    textColor: '#F6F5F2',

    name: 'โปรไฟล์',
    to: '/Profile',
    icon: 'cil-drop',
  },


]
