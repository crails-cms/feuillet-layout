#pragma once
#include <crails/cms/views/layout.hpp>

struct Feuillet : public Crails::Cms::Layout
{
  Feuillet();

  const Crails::Cms::Style& get_style() const override;
};
