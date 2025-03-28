import { defineComponent, h, onMounted, ref, resolveComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { CBadge, CSidebarNav, CNavItem, CNavGroup, CNavTitle } from '@coreui/vue'
import nav from './_nav'
import simplebar from 'simplebar-vue'

const normalizePath = (path) =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(html)$/, '')

const isActiveLink = (route, link) => {
  if (link === undefined) {
    return false
  }

  if (route.hash === link) {
    return true
  }

  const currentPath = normalizePath(route.path)
  const targetPath = normalizePath(link)

  return currentPath === targetPath
}

const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.to)) {
    return true
  }

  if (item.items) {
    return item.items.some((child) => isActiveItem(route, child))
  }

  return false
}

const AppSidebarNav = defineComponent({
  name: 'AppSidebarNav',
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  setup() {
    const route = useRoute()
    const firstRender = ref(true)

    onMounted(() => {
      firstRender.value = false
    })

    const renderItem = (item) => {
      const defaultColor = '#FEFAF6'; // สีเริ่มต้นเมื่อไม่มีการ hover หรือคลิก
      const hoverColor = '#10439F'; // สีเมื่อ hover หรือคลิก

      let itemStyle = {
        color: defaultColor, // กำหนดสีตัวอักษรเริ่มต้น
      };
      let iconStyle = {
        color: defaultColor, // กำหนดสีไอคอนเริ่มต้น
      };

      let itemHoverStyle = {}; // สไตล์เมื่อ hover


      const handleMouseEnter = () => {
        itemStyle.color = hoverColor;
        iconStyle.color = hoverColor;
        itemHoverStyle = { backgroundColor: '#007BFF' }; // เปลี่ยนสีพื้นหลังเมื่อ hover เมนูเป็นสีฟ้า
      };

      const handleMouseLeave = () => {
        itemStyle.color = defaultColor;
        iconStyle.color = defaultColor;
        itemHoverStyle = {}; // เมื่อไม่ hover ให้ลบสีพื้นหลัง
      };

      if (isActiveLink(route, item.to)) {
        itemStyle.color = hoverColor; // กำหนดสีตัวอักษรเมื่อ hover หรือคลิก
        iconStyle.color = hoverColor; // กำหนดสีไอคอนเมื่อ hover หรือคลิก
      }

      if (item.items) {
        return h(
          CNavGroup,
          {
            as: 'div',
            compact: true,
            textColor: itemStyle.color, // ใช้สีตัวอักษรจากตัวแปร itemStyle

            ...(firstRender.value && {
              visible: item.items.some((child) => isActiveItem(route, child)),
            }),
          },
          {
            togglerContent: () => [
              h(resolveComponent('CIcon'), {
                customClassName: 'nav-icon',
                name: item.icon,
                style: iconStyle, // กำหนดสีไอคอน
              }),
              h('span', { style: itemStyle, class: 'nav-item', onMouseenter: handleMouseEnter, onMouseleave: handleMouseLeave }, item.name), // เพิ่ม class 'nav-item' และ Event Listener
            ],
            default: () => item.items.map((child) => renderItem(child)),
          },
        );
      }

      return item.to
        ? h(
          RouterLink,
          {
            to: item.to,
            custom: true,
          },
          {
            default: (props) =>
              h(
                resolveComponent(item.component),
                {
                  active: item.to ? isActiveLink(route, item.to) : isActiveItem(route, item),
                  as: 'div',
                  href: item.to ? item.to : undefined,
                  onClick: item.to ? () => { } : undefined,
                  style: itemStyle, // กำหนดสีตัวอักษรเมื่อ hover หรือคลิก
                },
                {
                  default: () => [
                    item.icon
                      ? h(resolveComponent('CIcon'), {
                        customClassName: 'nav-icon',
                        name: item.icon,
                        style: iconStyle, // กำหนดสีไอคอน
                      })
                      : h('span', { class: 'nav-icon' }, h('span', { class: 'nav-icon-bullet' })),
                    h('span', { style: itemStyle, class: 'nav-item', onMouseenter: handleMouseEnter, onMouseleave: handleMouseLeave }, item.name), // เพิ่ม class 'nav-item' และ Event Listener
                    item.badge &&
                    h(
                      CBadge,
                      {
                        class: 'ms-auto',
                        color: item.badge.color,
                      },
                      {
                        default: () => item.badge.text,
                      },
                    ),
                  ],
                },
              ),
          },
        )
        : h(
          resolveComponent(item.component),
          {
            as: 'div',
          },
          {
            default: () => h('span', { style: itemStyle, class: 'nav-item', onMouseenter: handleMouseEnter, onMouseleave: handleMouseLeave }, item.name), 
          },
        );
    };


    return () =>
      h(
        CSidebarNav,
        {
          as: simplebar,
        },
        {
          default: () => nav.map((item) => renderItem(item)),
        }
      )
  },
})
export { AppSidebarNav }
