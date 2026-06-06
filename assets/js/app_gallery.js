
async function loadData(){
 const res=await fetch('content_gallery.json?t=' + new Date().getTime());
 const instruments=await res.json();
 render(instruments);
}

function render(items){
 const list=document.getElementById('instrumentList');
 list.innerHTML='';

 items.forEach(item=>{
   list.insertAdjacentHTML('beforeend',`
   <div class="instrument-item" data-cat="${item.category}">
      <div class="instrument-id">${item.id}.</div>
      <div class="instrument-details">
         <img src="${item.image}" alt="${item.title}" class="gallery-image"
              onerror="this.src='assets/images/no-image.jpg'">

         <span class="category-badge">${item.badge}</span>
         <div class="instrument-title">${item.title}</div>
         <div class="instrument-meta">${item.meta || ''}</div>

         <button class="open-gallery"
           onclick="openGallery('${item.image}','${item.title}')">
           Kép megnyitása
         </button>
      </div>
   </div>`);
 });
}

function openGallery(image,title){
 const modal=document.getElementById('galleryModal');
 document.getElementById('galleryImage').src=image;
 document.getElementById('galleryTitle').textContent=title;
 modal.style.display='flex';
}

function closeGallery(){
 document.getElementById('galleryModal').style.display='none';
}

loadData();
