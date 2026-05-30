<div class="tool-options-container" id="options-tool-collage-img" style="display: none;">
  <div class="control-group">
    <label class="control-label">Bố cục lưới</label>
    <select class="form-input" id="collage-layout-select">
      <option value="2x2">Lưới 2x2 (4 hình)</option>
      <option value="1x2">1 Hàng 2 Cột (2 hình)</option>
      <option value="1x3">1 Hàng 3 Cột (3 hình)</option>
    </select>
  </div>
  <div class="control-group">
    <label class="control-label">Khoảng cách viền</label>
    <div class="range-container">
      <input type="range" class="range-slider" id="collage-gap-slider" min="0" max="40" value="10">
      <span class="range-val" id="val-collage-gap">10px</span>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label">Bo tròn góc ảnh</label>
    <div class="range-container">
      <input type="range" class="range-slider" id="collage-round-slider" min="0" max="30" value="8">
      <span class="range-val" id="val-collage-round">8px</span>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label">Màu nền viền</label>
    <div class="color-picker-container">
      <input type="color" class="color-swatch-input" id="collage-bg-input" value="#ffffff">
      <span>Chọn màu viền</span>
    </div>
  </div>
</div>
