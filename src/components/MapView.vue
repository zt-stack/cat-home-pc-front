<template>
  <div id="map" style="height: 83%; width: 83%"></div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'MapComponent',
  setup() {
    onMounted(() => {
      const script = document.createElement('script')
      script.src = `https://map.qq.com/api/gljs?v=1.exp&key=QYVBZ-DODKQ-NSN5D-BPMWD-U3ZRQ-YFBRT`
      document.head.appendChild(script)

      script.onload = () => {
        const zhangjiajieCoordinates = new TMap.LatLng(
          29.151725947778164,
          110.45437886984101
        )

        const map = new TMap.Map('map', {
          center: zhangjiajieCoordinates,
          zoom: 17.65,
          pitch: 45,
          rotation: 45
        })

        const markers = [
          {
            position: new TMap.LatLng(29.151725947778164, 110.45437886984101),
            properties: {
              title: '小徐的窝'
            }
          },
          {
            position: new TMap.LatLng(29.152777305550806, 110.45518754411506),
            properties: {
              title: '小橘的窝'
            }
          },
          {
            position: new TMap.LatLng(29.1522776216122, 110.4524741946627),
            properties: {
              title: '小白的窝'
            }
          }
        ]

        const multiMarker = new TMap.MultiMarker({
          map: map,
          geometries: markers
        })

        // 监听标记的点击事件
        multiMarker.on('click', (evt) => {
          const marker = evt.geometry

          // 如果已经存在信息窗口，先将其关闭
          if (map.infoWindow) {
            map.infoWindow.close()
          }

          // 创建新的信息窗口
          const infoWindow = new TMap.InfoWindow({
            map: map,
            position: marker.position,
            content: `<div style="font-size:14px;">${marker.properties.title}</div>`,
            offset: { x: 0, y: -32 }
          })

          // 打开信息窗口并保存引用
          infoWindow.open()
          map.infoWindow = infoWindow // 保存信息窗口以便后续关闭
        })
      }
    })
  }
}
</script>

<style scoped>
#map {
  position: fixed;
}
</style>
